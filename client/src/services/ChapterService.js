import axios from 'axios';

const url = '/api/chapters/';

class ChapterService {
  // Get Chapter
  static getChapters() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
        resolve(
          data.map(chapter => ({
            ...chapter,
            createdAt: new Date(chapter.createdAt)
          }))
        );
      } catch(err) {
        reject(err);
      }
    })
  }

  // Create Chapter
  static insertChapter(title, title_link, subtitle, text, image, location, time_frame) {
    return axios.post(url, {
      title,
      title_link,
      subtitle,
      text,
      image,
      location,
      time_frame
    });
  }

  // Delete Chapter
  static deleteChapter(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default ChapterService;