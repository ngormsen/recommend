import { Group } from './group.model';
import { Item } from './item.model';

// Items
var item1 = new Item ("Fluch der Karibik", "https://images.penguinrandomhouse.com/cover/9780345805096", "this girl with a luminous digital display wired to a subcutaneous chip. They were dropping, losing altitude in a canyon of rainbow foliage, a lurid communal mural that completely covered the hull of the previous century.");
var item2 = new Item ("Herr der Ringe", "https://images-na.ssl-images-amazon.com/images/I/51EstVXM1UL._SX331_BO1,204,203,200_.jpg", "Strata of cigarette smoke rose from the tiers, drifting until it struck currents set up by the blowers and the robot gardener.");
var item3 = new Item ("Harry Potter", "https://images-na.ssl-images-amazon.com/images/I/71ykU-RQ0nL._SY606_.jpg", "Light from a service hatch at the rear wall dulling the roar of the spherical chamber. Before they could stampede, take flight from the Chinese program’s thrust, a worrying impression of solid fluidity");

// Groups
var group1 = new Group ("Frankfurt", [item1, item2])
var group2 = new Group ("Mainz", [item1])
var group3 = new Group ("Dusseldorf", [item1, item2, item3])

export const GROUPS: Group[] = [
    group1,
    group2,
    group3
]
