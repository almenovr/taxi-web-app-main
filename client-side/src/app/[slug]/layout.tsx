"use client";

import ListingImageGallery from "@/components/listing-image-gallery/ListingImageGallery";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode } from "react";
import { Route} from "next";
import MobileFooterSticky from "@/app/(listing-detail)/(components)/MobileFooterSticky";

const DetailtLayout = ({ children }: { children: ReactNode }) => {
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
    <div className="ListingDetailPage">
      <ListingImageGallery
        isShowModal={modal === "PHOTO_TOUR_SCROLLABLE"}
        onClose={handleCloseModalImageGallery}
      />

      <div className="container ListingDetailPage__content">{children}</div>

      {/* OTHER SECTION */}
    

      {/* STICKY FOOTER MOBILE */}
      <MobileFooterSticky />
    </div>
  );
};

export default DetailtLayout;
