"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiShoppingBag,
  FiArrowRight,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiStar,
  FiMenu,
} from "react-icons/fi";

const products = [
  {
    name: "Premium Nigerian Rice",
    size: "5kg Bag",
    price: "₦8,500",
    image: "/images/products/rice-5kg.jpeg",
  },
  {
    name: "Premium Nigerian Rice",
    size: "10kg Bag",
    price: "₦16,500",
    image: "/images/products/rice-10kg.jpeg",
  
  },
  {
    name: "Premium Nigerian Rice",
    size: "25kg Bag",
    price: "₦39,000",
    image: "/images/products/rice-25kg.jpeg",
    
  },
  {
    name: "Premium Nigerian Rice",
    size: "50kg Bag",
    price: "₦76,000",
    image: "/images/products/rice-50kg.jpeg",
    
  },
];


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <main className="min-h-screen bg-[#FAF9F4] text-[#183B2B]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-green-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">

          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Nri<span className="text-[#72A942]">Mart</span>
            <span className="ml-1 text-xs font-medium text-[#C59B45]">.</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <Link href="/" className="text-[#72A942]">Home</Link>
            <a href="#products" className="transition hover:text-[#72A942]">
              Shop Rice
            </a>
            <a href="#about" className="transition hover:text-[#72A942]">
              About Us
            </a>
            <a href="#contact" className="transition hover:text-[#72A942]">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-[#183B2B] px-5 py-2.5 text-sm font-semibold transition hover:bg-[#183B2B] hover:text-white sm:block"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-[#183B2B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#72A942]"
            >
              Get Started
            </Link>

            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
                aria-label="Toggle navigation menu"
                aria-expanded={isMenuOpen}
            >
              <FiMenu size={23} />
           </button>
          </div>
        </div>
        {isMenuOpen && (
  <nav className="border-t border-gray-100 bg-white px-5 py-5 md:hidden">
    <div className="flex flex-col gap-5 font-medium">

      <Link href="/" onClick={() => setIsMenuOpen(false)}>
        Home
      </Link>

      <a href="#products" onClick={() => setIsMenuOpen(false)}>
        Shop Rice
      </a>

      <a href="#about" onClick={() => setIsMenuOpen(false)}>
        About Us
      </a>

      <a href="#contact" onClick={() => setIsMenuOpen(false)}>
        Contact
      </a>

      <Link href="/login" onClick={() => setIsMenuOpen(false)}>
        Login
      </Link>

      <Link
        href="/register"
        onClick={() => setIsMenuOpen(false)}
        className="rounded-full bg-[#183B2B] px-5 py-3 text-center text-white"
      >
        Get Started
      </Link>

    </div>
  </nav>
)}
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#183B2B]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24 lg:px-10">

          <div className="relative z-10">
            <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#D5E9B7]">
              FRESHNESS YOU CAN TRUST
            </span>

            <h1 className="max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Quality Rice,
              <span className="block text-[#A8CE76]">
                Delivered to Your Door.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-8 text-white/75">
              Shop quality Nigerian rice in 5kg, 10kg, 25kg and 50kg bags.
              Good quality, great value and convenient shopping.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#products"
                className="inline-flex items-center gap-3 rounded-full bg-[#A8CE76] px-7 py-4 font-bold text-[#183B2B] transition hover:bg-white"
              >
                Shop Now <FiArrowRight />
              </a>

              <Link
                href="/register"
                className="rounded-full border border-white/40 px-7 py-4 font-semibold text-white transition hover:bg-white hover:text-[#183B2B]"
              >
                Create Account
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/80">
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p>Rice sizes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p>Quality focus</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">Easy</p>
                <p>Shopping</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-full bg-[#A8CE76]/10 blur-3xl" />

            <img
              src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1000"
              alt="Fresh quality rice"
              className="relative h-87.5px w-full rounded-[35px] object-cover shadow-2xl md:h-120px"
            />

            <div className="absolute bottom-6 left-6 rounded-2xl bg-white p-5 shadow-xl">
              <p className="text-xs font-medium text-gray-500">
                QUALITY YOU DESERVE
              </p>
              <p className="mt-1 text-lg font-extrabold text-[#183B2B]">
                Shop with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-10">
        {[
          {
            icon: FiShield,
            title: "Quality Products",
            description: "Carefully selected rice for your household.",
          },
          {
            icon: FiTruck,
            title: "Convenient Shopping",
            description: "A simple way to order your preferred rice size.",
          },
          {
            icon: FiHeadphones,
            title: "Customer Support",
            description: "We're here to help with your shopping experience.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="rounded-xl bg-[#EAF2E2] p-3 text-[#528A38]">
              <item.icon size={25} />
            </div>
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">

          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#72A942]">
                Our Collection
              </p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                Shop Our Rice Sizes
              </h2>
              <p className="mt-3 text-gray-500">
                Find the perfect size for your household.
              </p>
            </div>

            <a
              href="#products"
              className="flex items-center gap-2 font-bold text-[#528A38]"
            >
              Explore Products <FiArrowRight />
            </a>
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.size}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-[#FAF9F4] transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                
                </div>

                <div className="p-5">
                  <div className="mb-2 flex items-center gap-1 text-[#C59B45]">
                    <FiStar size={14} />
                    <span className="text-xs font-semibold text-gray-500">
                      Quality selection
                    </span>
                  </div>

                  <h3 className="font-bold">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.size}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-xl font-extrabold text-[#183B2B]">
                      {product.price}
                    </p>

                    <Link
                      href="/register"
                      aria-label={`Get started to buy ${product.size} rice`}
                      className="rounded-full bg-[#183B2B] p-3 text-white transition hover:bg-[#72A942]"
                    >
                      <FiShoppingBag size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            Sample product prices for the homepage. We will connect these to
            the admin product database later.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:px-10">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=900"
            alt="Quality rice grains"
            className="h-87.5px w-full rounded-3xl object-cover"
          />

          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#72A942]">
              Welcome to NriMart
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Making Quality Rice Shopping Easier.
            </h2>

            <p className="mt-5 leading-8 text-gray-600">
              NriMart is focused on making it easier for customers to find
              and purchase quality rice in different bag sizes. Whether
              you're shopping for yourself or your family, we've got options
              to suit your needs.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#183B2B] px-7 py-4 font-bold text-white transition hover:bg-[#72A942]"
            >
              Join NriMart <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 lg:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[30px] bg-[#183B2B] px-7 py-14 text-center sm:px-16">
          <p className="text-sm font-bold uppercase tracking-widest text-[#A8CE76]">
            Your Shopping Starts Here
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Shop Quality Rice?
          </h2>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-white/70">
            Create your NriMart account and discover convenient rice shopping.
          </p>

          <Link
            href="/register"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#A8CE76] px-8 py-4 font-bold text-[#183B2B] transition hover:bg-white"
          >
            Create Your Account <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#102B20] px-5 py-12 text-white lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <h2 className="text-2xl font-extrabold">
              Nri<span className="text-[#A8CE76]">Mart</span>.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-7 text-white/60">
              Quality rice shopping, made simple and convenient.
            </p>
          </div>

          <div>
            <h3 className="font-bold">Quick Links</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              <Link href="/" className="hover:text-white">Home</Link>
              <a href="#products" className="hover:text-white">Shop Rice</a>
              <Link href="/login" className="hover:text-white">Login</Link>
              <Link href="/register" className="hover:text-white">Register</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold">Contact</h3>
            <p className="mt-4 text-sm leading-7 text-white/60">
              Have questions about NriMart? We'd love to hear from you.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} NriMart. All rights reserved.
        </div>
      </footer>
    </main>
  );
}