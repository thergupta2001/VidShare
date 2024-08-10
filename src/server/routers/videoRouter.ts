import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { TRPCError } from "@trpc/server";

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
            base64: z.string()
        }))
        .mutation(async ({ input }) => {
            if (!input) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "No file provided"
                })
            }

            if (input.size > 50 * 1024 * 1024) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'File size exceeds 50MB limit',
                });
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
                return { successs: true }
            } catch (error) {
                throw new Error("Failed to upload file!");
            }
        })
})

