import { Component, OnInit } from "@angular/core";
import { ContactsService } from "../contacts.service";
import { ProductsService } from "../product-home.service";
import { CategoriesService } from "../category.service";
import { Category } from "../Models/Category";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.css"],
})
export class ChartsComponent implements OnInit {
  initialLetter = [];
  contactsByFullName = [];
  emailExtensions = [];
  phonePrefixData = [];
  productsByCategory = [];
  averagePriceByCategory = [];
  stockByCategoryData = [];
  productActive = [];

  constructor(
    private contactsService: ContactsService,
    private ProductService: ProductsService,
    private CategoryService: CategoriesService
  ) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe((data) => {
      this.initialLetter = this.calculateInitialLettersData(data);
      this.contactsByFullName = this.calculateContactsByFullNameData(data);
      this.emailExtensions = this.calculateEmailExtensionsData(data);
      this.phonePrefixData = this.generatePhonePrefixData(data);
    });

    this.ProductService.getProducts().subscribe((data) => {
      this.productsByCategory = this.groupProductsByCategory(data);
      this.averagePriceByCategory = this.calculateAveragePriceByCategory(data);
      this.stockByCategoryData = this.generateStockByCategoryData(data);
      this.productActive = this.getproductActive(data);

    });
  }

  calculateInitialLettersData(contacts: any[]): any {
    return contacts.reduce((result, contact) => {
      const initial = contact.surname.charAt(0).toUpperCase();
      if (result.find((item) => item.name === initial)) {
        result.find((item) => item.name === initial).value++;
      } else {
        result.push({ name: initial, value: 1 });
      }
      return result;
    }, []);
  }

  calculateContactsByFullNameData(contacts: any[]): any {
    let tempContactsByFullName = [
      {
        name: "Contacts",
        series: [],
      },
    ];

    contacts.forEach((contact) => {
      const fullName = contact.name + contact.surname + contact.surname2;
      const size = fullName.length;
      const range = `${size - (size % 5)} - ${size - (size % 5) + 4} ch.`;
      let existingRange = tempContactsByFullName[0].series.find(
        (item) => item.name === range
      );
      if (existingRange) {
        existingRange.value++;
      } else {
        tempContactsByFullName[0].series.push({ name: range, value: 1 });
      }
    });
    return tempContactsByFullName.map((entry) => {
      return {
        ...entry,
        series: entry.series.sort(
          (a, b) => Number(a.name.split("-")[0]) - Number(b.name.split("-")[0])
        ),
      };
    });
  }
  calculateEmailExtensionsData(contacts: any[]): any {
    let emailExtensionsMap = new Map<string, number>();

    contacts.forEach((contact) => {
      let emailParts = contact.email.split("@");
      if (emailParts.length == 2) {
        const domain = emailParts[1];
        const firstDotIndex = domain.indexOf(".");
        if (firstDotIndex != -1) {
          const extension = domain.substring(firstDotIndex);
          if (emailExtensionsMap.has(extension)) {
            emailExtensionsMap.set(
              extension,
              emailExtensionsMap.get(extension) + 1
            );
          } else {
            emailExtensionsMap.set(extension, 1);
          }
        }
      }
    });

    let emailExtensions = [];
    emailExtensionsMap.forEach((value, key) => {
      emailExtensions.push({ name: key, value: value });
    });
    return emailExtensions;
  }
  generatePhonePrefixData(contacts: any[]): any {
    let phonePrefixData = [];
    let prefixCounts = {};
    contacts.forEach((contact) => {
      const phonePrefix = String(contact.phone).substring(0, 1);
      if (prefixCounts[phonePrefix]) {
        prefixCounts[phonePrefix]++;
      } else {
        prefixCounts[phonePrefix] = 1;
      }
    });

    for (let prefix in prefixCounts) {
      if (prefixCounts.hasOwnProperty(prefix)) {
        phonePrefixData.push({ name: prefix, value: prefixCounts[prefix] });
      }
    }
    return phonePrefixData;
  }
  groupProductsByCategory(products: any[]): any {
    let productsByCategoryMap = new Map<string, number>();

    products.forEach((product) => {
      const categoryName = product.category.name;

      if (productsByCategoryMap.has(categoryName)) {
        productsByCategoryMap.set(
          categoryName,
          productsByCategoryMap.get(categoryName) + 1
        );
      } else {
        productsByCategoryMap.set(categoryName, 1);
      }
    });

    let productsByCategory = [];
    productsByCategoryMap.forEach((value, key) => {
      productsByCategory.push({ name: key, value: value });
    });

    return productsByCategory;
  }

  calculateAveragePriceByCategory(products: any[]): any {
    let averagePriceByCategoryMap = new Map<
      string,
      { total: number; count: number }
    >();

    products.forEach((product) => {
      const categoryName = product.category.name;
      const price = product.price;

      if (averagePriceByCategoryMap.has(categoryName)) {
        const currentCategoryData = averagePriceByCategoryMap.get(categoryName);
        currentCategoryData.total += price;
        currentCategoryData.count++;
      } else {
        averagePriceByCategoryMap.set(categoryName, { total: price, count: 1 });
      }
    });

    let averagePriceByCategory = [];
    averagePriceByCategoryMap.forEach((value, key) => {
      const averagePrice = value.total / value.count;
      averagePriceByCategory.push({ name: key, value: averagePrice });
    });

    return averagePriceByCategory;
  }

  generateStockByCategoryData(products: any[]): any {
    let stockByCategoryData = [];
    
    products.forEach(product => {
      const categoryName = product.category.name;
      
      if (product.stock > 100) {
        const existingCategory = stockByCategoryData.find(item => item.name === categoryName);
  
        if (existingCategory) {
          existingCategory.value++;
        } else {
          stockByCategoryData.push({ name: categoryName, value: 1 });
        }
      }
    });
  
    return stockByCategoryData;
  }

  getproductActive(products: any[]): any {
    let availableProduct = [];
  
    products.forEach(product => {
      const availability = product.active ? "In Stock" : "Out Of Stock";
  
      if (availableProduct.find(item => item.name === availability)) {
        availableProduct.find(item => item.name === availability).value++;
      } else {
        availableProduct.push({ name: availability, value: 1 });
      }
    });
  
    return availableProduct;
  }
}  
