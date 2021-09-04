import swall from "./swall";

export default function ({ $axios, redirect }) {
  $axios.onResponse(Response => {
  }),

  $axios.onError(error => {
    // if(error.response.status === 500) {
    //   redirect('/sorry')
    // }
    if (error.response == null) {
      swall.error('پاسخی از سرویس دهنده دریافت نشد')
    }

    if (error.response.status == 422){
      //console.log(error.response.data.errors)
      for (const err in error.response.data.errors)
      {
        swall.error(error.response.data.errors[err][0]);

      }

    }

      //swall.message(error, 'error')
    return Promise.resolve(false);
  })
}
