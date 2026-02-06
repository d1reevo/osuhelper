import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
        // Simple error formatting for now
        const errors = result.error.flatten().fieldErrors;
        let errorMessage = "Ошибка валидации: ";
        if (errors.username) errorMessage += "Имя слишком короткое (мин 3). ";
        if (errors.email) errorMessage += "Некорректный Email. ";
        if (errors.password) errorMessage += "Пароль слишком короткий (мин 6). ";
        
        return NextResponse.json({ error: errorMessage.trim() }, { status: 400 });
    }

    const { username, email, password } = result.data;

    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { username, email, passwordHash }
        });
        return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
    } catch (e: any) {
        console.error("Registration Error:", e); // Add detailed logging
        if (e.code === 'P2002') {
            const target = e.meta?.target;
            if (target && target.includes('email')) {
                return NextResponse.json({ error: "Пользователь с таким Email уже существует" }, { status: 409 });
            }
            if (target && target.includes('username')) {
                return NextResponse.json({ error: "Пользователь с таким именем уже существует" }, { status: 409 });
            }
             return NextResponse.json({ error: "Пользователь уже существует" }, { status: 409 });
        }
        return NextResponse.json({ error: "Ошибка сервера при регистрации" }, { status: 500 });
    }
}
