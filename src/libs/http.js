class Http {
  static instance = new Http();

  get = async (url) => {
    try {
      let req = await fetch(url);

      let json = await req.json();

      return json;
    } catch (err) {
      console.log('http get mothod err', err);

      throw Error(err);
    }
  };

  post = async (url, body) => {
    try {
      let req = fetch(url, {
        method: 'POST',
        body: body,
      });

      let json = await req.json();
      return json;
    } catch (err) {
      console.log('http post mothod err', err);

      throw Error(err);
    }
  };
}

export default Http;
