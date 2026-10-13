// Categories list (used for filter pills)
const categories = ['All', 'Starters', 'Main Course', 'Desserts', 'Drinks'];

// Default menu items with authentic images
const defaultMenuItems = [
  { id:'m1',  name:'Gobi 65',              cat:'Starters',    price:6.99,  desc:'Crispy cauliflower bites tossed with spices and curry leaves',                                  emoji:'🌶️', veg:true,  pop:true,  image:'images/food/gobi-65.jpg' },
  { id:'m2',  name:'Medu Vada',            cat:'Starters',    price:7.50,  desc:'Golden fried lentil donuts served with coconut chutney and sambar',                           emoji:'🍩', veg:true,  pop:false, image:'images/food/medu-vada.jpg' },
  { id:'m3',  name:'Onion Pakoda',         cat:'Starters',    price:5.99,  desc:'Crisp onion fritters with a light gram flour batter and mild spices',                          emoji:'🧅', veg:true,  pop:false, image:'images/food/onion-pakoda.jpg' },
  { id:'m4',  name:'Masala Dosa',          cat:'Main Course', price:12.99, desc:'Crispy rice crepe filled with spiced potato masala and chutneys',                             emoji:'🥞', veg:true,  pop:true,  image:'images/food/masala-dosa.jpg' },
  { id:'m5',  name:'Idli Sambar',          cat:'Main Course', price:10.50, desc:'Steamed rice cakes served with aromatic sambar and coconut chutney',                          emoji:'🍽️', veg:true,  pop:true,  image:'images/food/idli-sambar.jpg' },
  { id:'m6',  name:'Paneer Butter Masala', cat:'Main Course', price:14.50, desc:'Soft paneer cubes simmered in rich tomato, butter and cashew gravy',                           emoji:'🧀', veg:true,  pop:false, image:'images/food/paneer-butter-masala.jpg' },
  { id:'m7',  name:'Andhra Chicken Curry', cat:'Main Course', price:16.50, desc:'Fiery coastal chicken curry cooked with curry leaves, chili and roasted spices',             emoji:'🍗', veg:false, pop:true,  image:'images/food/andhra-chicken-curry.jpg' },
  { id:'m8',  name:'Veg Biryani',          cat:'Main Course', price:15.99, desc:'Fragrant basmati rice layered with vegetables, herbs and saffron',                           emoji:'🍛', veg:true,  pop:true,  image:'images/food/veg-biryani.jpg' },
  { id:'m9',  name:'Kesari Bath',          cat:'Desserts',    price:6.50,  desc:'Golden semolina dessert flavored with saffron, cardamom and cashews',                       emoji:'🍮', veg:true,  pop:true,  image:'images/food/kesari-bath.jpg' },
  { id:'m10', name:'Mysore Pak',           cat:'Desserts',    price:7.00,  desc:'Rich ghee-based sweet cake with a delicate crumb and caramelized flavor',                   emoji:'🍬', veg:true,  pop:false, image:'images/food/mysore-pak.jpg' },
  { id:'m11', name:'Filter Coffee',        cat:'Drinks',      price:4.50,  desc:'Classic South Indian filter coffee brewed with chicory and frothy milk',                    emoji:'☕', veg:true,  pop:true,  image:'images/food/filter-coffee.jpg' },
  { id:'m12', name:'Mango Lassi',          cat:'Drinks',      price:4.99,  desc:'Creamy yogurt drink blended with mango pulp, cardamom and a hint of saffron',               emoji:'🥭', veg:true,  pop:true,  image:'images/food/mango-lassi.jpg' },
  { id:'m13', name:'Buttermilk',           cat:'Drinks',      price:3.99,  desc:'Refreshing spiced buttermilk with mint, cumin and curry leaves',                             emoji:'🥛', veg:true,  pop:false, image:'images/food/buttermilk.jpg' },
  { id:'m14', name:'Tender Coconut',       cat:'Drinks',      price:3.50,  desc:'Fresh coconut water served chilled with a dash of lime',                                    emoji:'🥥', veg:true,  pop:false, image:'images/food/tender-coconut.jpg' }
];

// Initialize menuItems with defaults so UI renders immediately
let menuItems = [...defaultMenuItems];
let orders    = [];
