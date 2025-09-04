"use client";

import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import MobileFooterSticky from "./(components)/MobileFooterSticky";
import { imageGallery as listingStayImageGallery } from "./listing-stay-detail/constant";
import { imageGallery as listingCarImageGallery } from "./listing-car-detail/constant";
import { imageGallery as listingExperienceImageGallery } from "./listing-experiences-detail/constant";
import { Route } from "next";

const ImageGalleryWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const thisPathname = usePathname();
  const searchParams = useSearchParams();
  const modal = searchParams?.get("modal");

  const handleCloseModalImageGallery = () => {
    let params = new URLSearchParams(document.location.search);
    params.delete("modal");
    router.push(`${thisPathname}/?${params.toString()}` as Route);
  };

  const getImageGalleryListing = () => {
    if (thisPathname?.includes("/listing-stay-detail")) {
      return listingStayImageGallery;
    }
    if (thisPathname?.includes("/listing-car-detail")) {
      return listingCarImageGallery;
    }
    if (thisPathname?.includes("/listing-experiences-detail")) {
      return listingExperienceImageGallery;
    }

    return [];
  };

  return (
    <>
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
        images={getImageGalleryListing()}
      />
      {children}
    </>
  );
};

const DetailtLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="ListingDetailPage">
      <Suspense fallback={<div>Loading...</div>}>
        <ImageGalleryWrapper>
          <div className="container ListingDetailPage__content">{children}</div>
        </ImageGalleryWrapper>
      </Suspense>

      {/* OTHER SECTION */}
      <div className="container py-24 lg:py-32">
      </div>

      {/* STICKY FOOTER MOBILE */}
    </div>
  );
};

export default DetailtLayout;
