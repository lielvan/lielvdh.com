export default {
  getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    const file_name = encodeURIComponent(file.name);
    xhr.open('GET', `/api/sign-s3?file-name=${file_name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url);
        }
        else {
          console.error('Could not get signed URL.');
        }
      }
    };
    xhr.send();
  },
  uploadFile(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          console.log(`File ${file.name} was uploaded successfully. \n File URL: ${url}`);
        }
      }
    };
    xhr.send(file);
  }
}
