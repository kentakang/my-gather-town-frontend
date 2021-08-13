export interface Area {
    width: number;
    height: number;
    x: number;
    y: number;
    accessable: boolean;
}

export interface Map {
    info: {
        name: string;
        author: string;
        image: string;
    };
    areas: Area[];
}

const loadMap = async (mapURL: string): Promise<Map> => {
  const jsonFile = await fetch(mapURL).then((res) => res.json());

  return jsonFile;
};

export default loadMap;
