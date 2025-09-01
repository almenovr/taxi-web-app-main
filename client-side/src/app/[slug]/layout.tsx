"use client";

import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, Suspense } from "react";
import { Route} from "next";
import MobileFooterSticky from "@/app/(listing-detail)/(components)/MobileFooterSticky";

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

  return (
    <>
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
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


      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailtLayout;
