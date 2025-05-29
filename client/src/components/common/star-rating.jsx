import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
 // console.log(rating, "rating");

  return [1, 2, 3, 4, 5].map((star, index) => (
      <Button key={index}
      className={`p-2  transition-colors border border-gray-300 ${
        star <= rating
          ? "text-yellow-500 hover:bg-black"
          : "text-gray-400 hover:bg-yellow-500 hover:text-yellow-500"
      }`}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-yellow-500" : "fill-white"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;