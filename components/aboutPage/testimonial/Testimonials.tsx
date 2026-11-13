import Testimonial from "../../Testimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { testimonials } from "@/data/profile";

export default function Testimonials() {
  return (
    <div className="testimonials">
      <Swiper pagination={true} modules={[Pagination]}>
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <Testimonial testimonial={t} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
