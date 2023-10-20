import "dotenv/config";

const apiURL = process.env.API_URL;

const getFolder = (data, folder) => {
  const folderData = data.tree.filter((item) => item.path === folder);
  return folderData;
};

const fetchUrl = async (url) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/vnd.github+json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "X-GitHub-Api-Version": `${process.env.API_VERSION}`,
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

const filter = (data, type) => {
  const filter = data.tree.filter((item) => item.type === type);
  const filterData = filter.map((item) => {
    return {
      name: item.path,
      sha: item.sha,
    };
  });
  return filterData;
};

const getFolderContents = async (url, folder) => {
  const root = await fetchUrl(url);
  const folderData = getFolder(root, folder);
  return folderData;
};

export async function getApis() {
  const root = await getFolderContents(apiURL + "master", "data");
  const data = await getFolderContents(root[0].url, "apis");
  const apis = await fetchUrl(data[0].url);

  return filter(apis, "tree");
}

export async function getDeployments(params) {
  const root = await getFolderContents(apiURL + params.hash, "deployments");
  const deployments = await fetchUrl(root[0].url);
  return filter(deployments, "tree");
}

export async function getDeployment(params) {
  const root = await fetchUrl(apiURL + params.hash);

  const configs = [];

  for (const item of root.tree) {
    const config = await fetchUrl(item.url);
    const encoded = Buffer.from(config.content, "base64").toString("ascii");
    const json = JSON.parse(encoded);

    configs.push(json);
  }

  return configs;
}
