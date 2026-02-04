"use client";

import { motion } from "framer-motion";
import { Check, X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function Showcase() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  const images = [
    {
      src: "/brand/synq-inventory.png",
      alt: "Add cards to Shopify",
      title: "Add Cards Instantly",
      description:
        "Search our database, select condition, and create Shopify draft products with one click. Images, descriptions, and prices included.",
    },
    {
      src: "/brand/synq-transactions.png",
      alt: "Price sync dashboard",
      title: "Daily Price Updates",
      description:
        "Prices sync daily from the market. See which products are under or overpriced at a glance.",
    },
    {
      src: "/brand/synq-library.png",
      alt: "One-click update",
      title: "One-Click Updates",
      description:
        "Update all your Shopify prices to match current market rates with a single click.",
    },
  ];

  // Core features data
  const coreFeatures = [
    {
      title: "Add Cards to Shopify in Seconds",
      description:
        "Search from thousands of Pokemon, Magic, and other trading cards. Select the condition, set your markup, and create a Shopify draft product instantly with the correct image, title, and description.",
      image: "/brand/synq-inventory.png",
      alt: "Add cards to Shopify",
      features: [
        "Complete card database with images",
        "Automatic product descriptions",
        "Condition-based pricing (NM, LP, MP, etc.)",
        "Creates draft products ready to publish",
      ],
      cta: "Start adding cards",
    },
    {
      title: "Prices Updated Daily from the Market",
      description:
        "Synq pulls the latest market prices every day from TCGPlayer (US) or Cardmarket (EU). You'll see exactly which of your Shopify products are priced below or above the current market rate.",
      image: "/brand/synq-transactions.png",
      alt: "Price sync dashboard",
      features: [
        "Daily automatic price sync",
        "See price differences at a glance",
        "TCGPlayer (US) or Cardmarket (EU) data",
        "See when prices shift",
      ],
      cta: "See pricing in action",
    },
    {
      title: "Update Prices with One Click",
      description:
        "When prices change, you can update your Shopify store right away. Select the products you want to update and apply the new prices in one click.",
      image: "/brand/synq-library.png",
      alt: "One-click price updates",
      features: [
        "Bulk price updates",
        "Set your own markup percentage",
        "Review changes before applying",
        "Keep your margins consistent",
      ],
      cta: "Update prices now",
    },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div
        className="bg-background py-16 border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.25, 0, 1] }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            className="text-2xl sm:text-3xl font-medium tracking-[-0.01em] text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1] }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground max-w-2xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.25, 0, 1], delay: 0.1 }}
          >
            Add cards and keep prices updated in three simple steps.
          </motion.p>

          <div className="space-y-16">
            {/* Image Carousel - Hidden for now */}
            {/* <motion.div
              className="relative max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.25, 0, 1],
                delay: 0.2
              }}
            >
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-sm transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full p-2 shadow-sm transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>

              <div className="relative">
                <div
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setIsImageModalOpen(true)}
                >
                  <Image
                    src={images[currentImage].src}
                    alt={images[currentImage].alt}
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-xl font-light tracking-[-0.01em] text-white mb-2">
                    {images[currentImage].title}
                  </h3>
                  <p className="text-sm font-light tracking-[-0.01em] text-white/80">
                    {images[currentImage].description}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-2 mt-6">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentImage
                        ? "bg-gray-800"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div> */}

            {/* Core Features Grid */}
            <div className="space-y-16">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={`flex flex-col lg:flex-row lg:items-start lg:gap-12 ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.25, 0, 1],
                    delay: (index + 1) * 0.1,
                  }}
                >
                  <div className="lg:w-1/2 lg:flex-shrink-0 mb-8 lg:mb-0">
                    <div
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => {
                        setClickedImage({
                          src: feature.image,
                          alt: feature.alt,
                        });
                        setIsImageModalOpen(true);
                      }}
                    >
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        width={600}
                        height={400}
                        className="w-full h-auto rounded-lg shadow-sm object-cover"
                      />
                    </div>
                  </div>
                  <div className="lg:w-1/2 lg:flex-1">
                    <h3 className="text-xl font-medium text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    <ul className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-foreground">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              className="mt-16 pt-12 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.25, 0, 1],
                delay: 0.4,
              }}
            >
              <h2 className="text-xl font-medium text-foreground mb-3">
                Want to see how it works with your store?
              </h2>
              <p className="text-base text-muted-foreground max-w-xl mb-6">
                Install the Synq app on your Shopify store and start syncing
                your card prices with the market.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Get started
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-12 right-0 text-foreground hover:text-muted-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <Image
              src={clickedImage?.src || images[currentImage].src}
              alt={clickedImage?.alt || images[currentImage].alt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
