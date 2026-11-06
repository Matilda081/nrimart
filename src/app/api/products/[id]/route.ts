import prisma from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

// UPDATE PRODUCT
export async function PUT(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return Response.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { name, description, price, weight, image, stock } = body;

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
        { message: "Invalid product information" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description.trim(),
        price,
        weight,
        image: image.trim(),
        stock,
      },
    });

    return Response.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update product error:", error);

    return Response.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE PRODUCT
export async function DELETE(
  request: Request,
  { params }: Context
) {
  try {
    const { id } = await params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return Response.json(
        { message: "Invalid product ID" },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return Response.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    return Response.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}