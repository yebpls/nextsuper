import authApiRequest from "@/apiRequests/auth.api";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return Response.json(
      {
        message: "Không tìm thấy refreshToken",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const { payload } = await authApiRequest.sRefreshToken({ refreshToken });
    const decodedAccessToken = jwt.decode(payload.data.accessToken) as {
      exp: number;
    };
    const decodedRefreshToken = jwt.decode(payload.data.refreshToken) as {
      exp: number;
    };
    cookieStore.set("accessToken", payload.data.accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", payload.data.refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });
    return Response.json(payload);
  } catch (error) {
    console.log(error);

    return Response.json({
      message: "Có lỗi xảy ra",
      status: 401,
    });
  }
}
