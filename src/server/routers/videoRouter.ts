import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import prisma from "../../../prisma/db";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export const videoRouter = router({
    uploadVideo: protectedProcedure
        .input(z.object({
            name: z.string(),
            type: z.string(),
            size: z.number(),
            base64: z.string(),
            title: z.string(),
            description: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            if (!input) {
                throw new Error("No file provided!")
            }

            if (input.size > 50 * 1024 * 1024) {
                throw new Error("File size exceeds 50MB limit!");
            }

            if (!input.title || !input.description) {
                throw new Error("Title and description are required!");
            }

            const filename = `${Date.now()} - ${input.name}`;
            const fileBuffer = Buffer.from(input.base64, 'base64');

            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: filename,
                Body: fileBuffer,
                ContentType: input.type
            }

            try {
                await s3Client.send(new PutObjectCommand(params));
                const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

                await prisma.video.create({
                    data: {
                        title: input.title,
                        description: input.description,
                        url: url,
                        userId: ctx.session.user.id,
                    }
                })

                return { success: true }
            } catch (error) {
                throw new Error("Failed to upload file!");
            }
        })
})

