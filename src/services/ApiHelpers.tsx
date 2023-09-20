export function hasSuccess(data:any) {

  if (
    data &&
    typeof data.isException !== "undefined" &&
    data.isException === true
  ) {
    return data;
  }

  return {
    data: data.responseData ? data.responseData : data,
    error: false,
    status: 200,
  };
  
}

export function hasError(err:any) {

  if (err === "Network Error") {
    return {
      data: null,
      error: "Please check your internet connection.",
      status: 0,
    };
  }
  return err;
}
