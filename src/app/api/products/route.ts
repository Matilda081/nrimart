import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(products);
  } catch (error) {
    console.error("Fetch products error:", error);

    return Response.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Check the logged-in user
    const session = await auth();

    // Only administrators can add products
    if (!session?.user || session.user.role !== "ADMIN") {
      return Response.json(
        { message: "Unauthorized access" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      name,
      description,
      price,
      weight,
      image,
      stock,
    } = body;

    // Validate product information
    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !["5kg", "10kg", "25kg", "50kg"].includes(weight) ||
      typeof image !== "string" ||
      !image.trim() ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return Response.json(
        { message: "Please provide valid product information" },
        { status: 400 }
      );
    }

    // Save product in MongoDB
    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        description: description.trim(),
        price,
        weight,
        image: image.trim(),
        stock,
      },
    });

    return Response.json(
      {
        message: "Product created successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);

    return Response.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}