import { Group } from './group.model';
import { Item } from './item.model';

// Items
var item1 = new Item ("Fluch der Karibik", "https://images.penguinrandomhouse.com/cover/9780345805096");
var item2 = new Item ("Herr der Ringe", "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwi86r6DlKLkAhXRfFAKHflbBAEQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.amazon.com%2FLord-Rings-J-R-R-Tolkien%2Fdp%2F0544003411&psig=AOvVaw2hWo6A4kl_WmZBIyK1s2sw&ust=1566964562426326");
var item3 = new Item ("Harry Potter", "https://images-na.ssl-images-amazon.com/images/I/71ykU-RQ0nL._SY606_.jpg");

// Groups
var group1 = new Group ("Frankfurt", [item1, item2])
var group2 = new Group ("Mainz", [item1])
var group3 = new Group ("Dusseldorf", [item1, item2, item3])

export const GROUPS: Group[] = [
    group1,
    group2,
    group3
]

