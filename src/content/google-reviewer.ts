export interface GoogleReview {
  id: string;
  reviewerName: string;
  rating: number;
  reviewText: string;
  date: string;
  service?: string; // Hangı hizmet için (ör: "Hyundai Triger Değişimi")
}

// Google yorumları burada saklanacak
export const googleReviews: GoogleReview[] = [
  // Örnek format:
  // {
  //   id: "review-1",
  //   reviewerName: "Ahmet Y.",
  //   rating: 5,
  //   reviewText: "Harika hizmet!",
  //   date: "2 hafta önce",
  //   service: "Hyundai Triger Değişimi"
  // }
];

