export function getImageBasePath(imgBasePath) {
   if (imgBasePath) {
      const basePath = imgBasePath.replace("/storage", "");
      return basePath;
   }
}
