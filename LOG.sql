
/*INSERT INTO products(product_name,department_name,price,stock_quantity)
values
('Commented Code', 'Necessity', 78.65 , 5),
('Good Sleep','Necessity',55.40, 4 ), 
('Registered Sublime 3', 'Hobby', 99.65, 6),
('Batteries', 'Electronics', 9.99, 50),
('Advanced DevTools', 'Debugging', 56.60, 8),
('Coffee', 'Necessity', 1.99, 17),
('Monitor', 'Electronics', 78.86, 10),
('Sense of Humor', 'Necessity', 50.60, 18),
('Eloquent JavaScript', 'Hobby', 10.50, 16),
('Clean Keyboard', 'Electronics', 30.60, 10);

SELECT * FROM products;

-- SHOW LOW BALANCE OF ITEMS IN TABLE
SELECT item_id , product_name, department_name,stock_quantity, price FROM products
WHERE stock_quantity <=5;


-- UPDATE product 
UPDATE products
SET stock_quantity = 3
WHERE item_id = 2;


SELECT * FROM products;
UPDATE products SET stock_quantity = 60
WHERE item_id = 5;



SELECT item_id AS Item ID ,product_name AS Product, price AS Price, stock_quantity AS Avaliablie  FROM products;

INSERT INTO
SELECT * FROM products;

CREATE TABLE `bamazone`.`departments` (
  `department_id` INT NOT NULL AUTO_INCREMENT,
  `department_name` VARCHAR(45) NULL,
  `over_head_costs` VARCHAR(45) NULL,
  `total_sales` DECIMAL(19,2) NULL,
  UNIQUE INDEX `department_id_UNIQUE` (`department_id` ASC),
  PRIMARY KEY (`department_id`));
INSERT INTO departments(department_id)

SELECT department_name

TRUNCATE TABLE departments;


INSERT INTO departments (department_name)
SELECT DISTINCT department_name FROM products;

INSERT INTO departments (department_name)
SELECT DISTINCT department_name FROM products;

INSERT INTO departments (department_name)
VALUES ('Codeing');
*/

