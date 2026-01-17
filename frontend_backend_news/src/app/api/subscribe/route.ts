import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';


function addCorsHeaders(res: NextResponse) {
  res.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173'); // Thay bằng URL Vite của bạn
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return res;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log(">>> Nhận yêu cầu đăng ký cho:", email);

    const EMAILS_PATH = path.join(process.cwd(), 'emails.json');

    try {
      await fs.access(EMAILS_PATH);
    } catch {
      await fs.writeFile(EMAILS_PATH, '[]');
    }

    const fileContent = await fs.readFile(EMAILS_PATH, 'utf8');
    const emails = fileContent ? JSON.parse(fileContent) : [];

    if (!emails.includes(email)) {
      emails.push(email);
      await fs.writeFile(EMAILS_PATH, JSON.stringify(emails, null, 2));
      console.log("Đã lưu email thành công vào file JSON!");
    }

    const response = NextResponse.json({ success: true });
    return addCorsHeaders(response);

  } catch (error: any) {
    console.error("LỖI TẠI API SUBSCRIBE:", error.message);
    const response = NextResponse.json({ error: error.message }, { status: 500 });
    return addCorsHeaders(response);
  }
}


export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return addCorsHeaders(response);
}