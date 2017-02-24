var mysql = require('mysql');
require('console.table');
var inquirer = require('inquirer');
var fs = require('fs');
var jsonfile = require('jsonfile');



var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'HelloWorld!',
	database: 'bamazone',
	port: 3306
});


connection.connect(function(err) {

	console.log('Connected as id:' + connection.threadId)
});
//pronot witj if statements for options
var MANAGER = function() {
	inquirer.prompt({
		type: 'list',
		name: 'choice',
		message: 'What would you like to do?',
		choices: [
			'View Products for Sale ',
			'View Low Inventory',
			'Add to Inventory',
			'Add New Product',
			'Exit'
		]

	}).then(function(answer) {
		var answer = answer.choice
		switch (answer) {
			case 'View Products for Sale ':
				connection.query("SELECT item_id AS 'Item ID' ,product_name AS 'Product', price AS 'Price', stock_quantity AS 'Avaliablie'  FROM products;",
					function(err, res) {

						if (err) {

							console.log(err)
							return;
						}
						console.table(res)
						MANAGER()
					});

				break;

			case 'View Low Inventory':
				//check oroduct less then 5
				connection.query("SELECT item_id AS 'Item ID' ,product_name AS 'Product', price AS 'Price', stock_quantity AS 'Avaliablie'  FROM products WHERE stock_quantity<=5 ",
					function(err, res) {

						if (err) {

							console.log(err)
							return;
						}
						console.table(res)
						MANAGER()
					});


				break;
			case 'Add to Inventory':

				connection.query("SELECT item_id AS 'ID' ,product_name AS 'Product', stock_quantity FROM products",
					function(err, res) {

						if (err) {

							console.log(err)
							return;
						}
						//product you want to add function 
						_this = this
						inquirer.prompt({
							name: 'choice',
							type: 'list',
							message: 'What product would you like to add?',
							choices: function(_this) {
								console.log(_this)
								var Picckarray = [];

								for (var i = 0; i < res.length; i++) {

									Picckarray.push(res[i].Product);
								}

								return Picckarray;

							}

						}).then(function(answer) {
							var item = answer.choice
							res.forEach(function(element, index) {

								if (element.Product === item) {

									//quantity for product
									inquirer.prompt({
										type: 'input',
										name: 'quantity',
										message: `How many pieces of ${element.Product} would you like to add? `,
										validate: function(value) {

											if (isNaN(value) == false) {
												return true;
											}
											return 'Please enter a number!';
										}
									}).then(function(answer) {

										var updatedQuantity = parseInt(element.stock_quantity) + parseInt(answer.quantity);

										//query SQL that adds to TABLE
										connection.query(`UPDATE products SET stock_quantity = ${updatedQuantity} WHERE item_id= ${element.ID} `,
											function(err, res) {

												if (err) {

													console.log(err)
													return;
												}
												console.log(`You successfully added ${answer.quantity} units of  ${element.Product}. The TOTAL count of units is ${updatedQuantity} ! `)
												MANAGER()
											});

									});

								}
							});
						})



					});
				break;

			case 'Add New Product':

				inquirer.prompt({
					type: 'input',
					name: 'productName',
					message: `What is the name of the product would you like to add?`,

				}).then(function(answer) {
					var product = answer.productName
					//add for depratment 
					connection.query("SELECT DISTINCT department_name FROM departments",
						function(err, res) {

							if (err) {

								console.log(err)
								return;
							}
							_this = this
							inquirer.prompt([
							{
								name: 'department',
								type: 'list',
								message: 'What department you want to add product in?',
								choices: function(_this) {
									console.log(_this)
									var Picckarray = [];

									for (var i = 0; i < res.length; i++) {
										
										Picckarray.push(res[i].department_name);
									}

									return Picckarray;

								}
							},
								{
									type: 'input',
									name: 'productPrice',
									message: `What is the price for the item?`,
									validate: function(value) {

											if (isNaN(value) == false) {
												return true;
											}
											return 'Please enter a number!';
																			

								}
							},
								{
									type: 'input',
									name: 'productQnty',
									message: `How many items do you have?`,
									validate: function(value) {

											if (isNaN(value) == false) {
												return true;
											}
											return 'Please enter a number!';
													
										}
							}

							]).then(function(answers) {
								console.log(answers)
								
								//ADDING OUR NEW ITEM HERE 
									var totalnew = {
										product_name: product,
										department_name: answers.department,
										price: answers.productPrice,
										stock_quantity:answers.productQnty

									}
								


								connection.query(`REPLACE INTO products SET ?` ,totalnew,
									function(err, res) {

										if (err) {

											console.log(err)
											return;
										}
										console.table(`The ${product} was added into the inventory!`)
										MANAGER()
									});



							})



							
						});


				})



				break;

				case 'Exit':
				process.exit()
				break;


			default:
				
				break;
		}



	})

}

MANAGER()