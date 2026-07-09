import { NextRequest , NextResponse } from "next/server"; 
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function GET(request: NextRequest) {
    try {
        const videos = await prisma.videos.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}