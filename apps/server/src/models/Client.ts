export interface IClient {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  coordinate_x?: number;
  coordinate_y?: number;
}

export class Client {
  id: number;
  name: string;
  coordinate_x: number;
  coordinate_y: number;
  constructor(id: number, name: string, coordinate_x: number, coordinate_y: number) {
    this.id = id;
    this.name = name;
    this.coordinate_x = coordinate_x;
    this.coordinate_y = coordinate_y;
  }

  distanceTo(otherClient: Client) {
    const dx = this.coordinate_x - otherClient.coordinate_x;
    const dy = this.coordinate_y - otherClient.coordinate_y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  public get clientModel() {
    return {
      id: this.id,
      name: this.name,
      coordinate_x: this.coordinate_x,
      coordinate_y: this.coordinate_y
    }
  }
}

export function nearestNeighbor(clients: Client[]) {
  const visited = new Set();
  const path = [];
  let currentClient: any

  currentClient = new Client(+new Date, "Starting Point", 0, 0); // Começando de (0, 0)

  while (visited.size <= clients.length) {
    visited.add(currentClient);
    path.push(currentClient.clientModel);
    let nearestClient = null;
    let minDistance = Infinity;

    for (const client of clients) {
      if (!visited.has(client)) {
        const distance = currentClient.distanceTo(client);

        if (distance < minDistance) {
          minDistance = distance;
          nearestClient = client;
        }
      }
    }

    currentClient = nearestClient;
  }

  // Retornar ao ponto de origem
  path.push(path[0]);

  return path;
}