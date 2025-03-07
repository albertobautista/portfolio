import { Resend } from "resend";
import type { APIRoute } from "astro";

const resend = new Resend(process.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, message } = await request.json();

    const emailData = {
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h1 style="color: #4CAF50;">Nuevo mensaje de contacto</h1>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background-color: #f9f9f9; padding: 10px; border-left: 5px solid #4CAF50;">
            ${message}
          </blockquote>
          <p style="font-size: 12px; color: #777;">Este mensaje fue enviado desde tu formulario de contacto.</p>
        </div>
      `,
    };

    const response = await resend.emails.send(emailData);
    if (response.error) {
      return new Response(
        JSON.stringify({ error: "Error sending the email" }),
        { status: 500 }
      );
    }
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error sending the email" }), {
      status: 500,
    });
  }
};
