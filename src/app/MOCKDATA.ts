import { Group } from './group.model';
import { Item } from './item.model';

// Items
var item1 = new Item ("Fluch der Karibik");
var item2 = new Item ("Herr der Ringe");
var item3 = new Item ("Harry Potter");

// Groups
var group1 = new Group ("Frankfurt", [item1, item2])
var group2 = new Group ("Mainz", [item1])
var group3 = new Group ("Dusseldorf", [item1, item2, item3])

export const GROUPS: Group[] = [
    group1,
    group2,
    group3
]

