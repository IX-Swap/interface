export type Documents = {
    _id: string,
    name: string,
    companyName: string,
};

export type ListingsList = {
    count: number,
    documents: Documents[],
    limit: number,
    skip: number,
}

export type ListingsState = {
    data: ListingsList[],
    isLoading: boolean,
    message?: string,
    error?: string,
};
    