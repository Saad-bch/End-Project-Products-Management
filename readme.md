# BitStore Group

## Summary
BitStore is a shop for digital products. It aims to give users a simple shopping journey. You can look at products, put them in your cart, and checkout. There is also a section for admin to manage products.

## Functions
- **Easy Navigation**: Go simply between Home, Products, Orders, and Admin areas.
- **Product Control**: Admins can add, change, or remove products in the admin section.
- **Shopping Cart**: Users can put items in their cart, see total costs, and check out.
- **Order Viewing**: Check old orders in the Orders area.
- **Flexible Design**: Works well on different screen sizes.

## Technologies Used
- HTML5
- CSS
- JavaScript
- Bootstrap for appearance
- LocalStorage for keeping data


# Plan Van Aanpak


## Product Display:
 Products are fetched from producten.json, stored in localStorage, and displayed on a dedicated product page. Users can browse through items, view details, and add them to the cart.

## Cart Management:
 Users can add products to their cart, view the cart contents, and proceed to checkout. Each cart operation (add/remove) updates both the page and localStorage.

## Order Processing:
 Orders placed through checkout are saved, and users can view past orders. There's an orders.js file specifically for managing and displaying orders after checkout.

## Admin Section:
 Accessible to the admin panel allows product management. Here, products can be added, edited, or removed, and changes are stored in localStorage.

## Page Persistence:
 The site remembers the user's current page, so if it refreshes, the user stays on the same page, enhancing usability.

This project provides a comprehensive, interactive webshop experience focused on handling digital products.