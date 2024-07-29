import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prisma from "../../../prisma/db";
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
            title: z.string(),
            file: z.object({
                name: z.string(),
                type: z.string(),
                size: z.number(),
            }),
        }))
        .mutation(async ({ input, ctx }) => {
            const { title, file } = input;
            console.log(title, file)
            const key = `videos/${Date.now()}-${file.name}`;

            const command = new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
                ContentType: file.type,
            });

            try {
                const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

                // Log the signed URL
                // console.log('Signed URL:', signedUrl);

                const video = await prisma.video.create({
                    data: {
                        title,
                        url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
                        userId: ctx.session.user.id,
                    },
                });

                return { signedUrl, video };
            } catch (error) {
                console.error('Error uploading video:', error);
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to upload video',
                });
            }
        }),
});
