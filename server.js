const shell = require("shelljs");
const prompt = require("prompt");
const download = require("image-downloader");

let acc = "";
// const arch = process.env.PROCESSOR_ARCHITECTURE;
// create interface for input and output

const imageSrc = (link, folder) => {
  const options = {
    url: link,
    dest: module.path + `\\${acc}\\${folder}`,
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log("Saved to", filename);
    })
    .catch((err) => console.error(err));
};

const RunEXE = async (userAcc, mount) => {
  var data = await shell
    .exec(`twmd -u ${userAcc} -a -n ${mount} -z`)
    .split("\n");
  let AllData = data.slice(data.indexOf("") + 1, data.lastIndexOf(""));
  console.log("\nSum of media : ", AllData.length);

  AllData.forEach((item) => {
    item.includes("mp4")
      ? imageSrc(item, "video")
      : imageSrc(item, "img");
  });
  // console.log(AllData);
};

const main = () => {
  prompt.start();

  prompt.get(["enter username account", "enter max amount of media"], function (err, result) {
    if (err) {
      return console.log(err);
    }
    acc = result["enter username account"];
    // console.log(Account);
    return RunEXE(result["enter username account"], result["enter max amount of media"]);
  });
};

main();
