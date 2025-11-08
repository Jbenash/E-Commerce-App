import p_img1_1 from './p_img1_1.jpg';
import p_img1_2 from './p_img1_2.jpg';
import p_img1_3 from './p_img1_3.jpg';
import p_img1_4 from './p_img1_4.jpg';
import p_img1_5 from './p_img1_5.jpg';
import p_img1_6 from './p_img1_6.jpg';
import logo from './logo.png';
import search_icon from './search_icon.jpg';
import profile_icon from './profile_icon.jpg';
import cart_icon from './cart_icon.png';
import menu_icon from './menu_icon.jpg';
import hero_img from './hero_img.jpg';

export const assets = {
    logo,
    search_icon,
    profile_icon,
    cart_icon,
    menu_icon,
    hero_img
}

export const products = [
    {
        id: "aaaaa",
        name: "Women Round Neck Pink T-Shirt",
        description: "Comfortable and stylish pink t-shirt perfect for casual wear.",
        price: 499,
        images: [p_img1_1],
        category: "Apparel",
        subCategory: "T-Shirts",
        Sizes: ["S", "M", "L", "XL"],
        date: 17032024,
        bestseller: true,
    },
    {
        id: "bbbbb",
        name: "Men's Casual Blue Jeans",
        description: "Stylish and comfortable blue jeans for everyday wear.",
        price: 899,
        images: [p_img1_1],
        category: "Apparel",
        subCategory: "Jeans",
        Sizes: ["S", "M", "L", "XL"],
        date: 17032024,
        bestseller: true,
    }
]