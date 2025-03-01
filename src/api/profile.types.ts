export interface FetchProfileDataResponse {
  success: boolean;
  data: {
    fullname: string;
    email: string;
  };
}

export interface FetchProfileAuthorResponse {
  success: boolean;
  data: {
    authorId: number;
    name: string;
  };
}

export interface FetchProfileQuoteResponse {
  success: boolean;
  data: {
    quoteId: number;
    authorId: number;
    quote: string;
  };
}
