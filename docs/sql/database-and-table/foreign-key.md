---
nav:
  title: SQL
  order: 2
group:
  title: 数据库和表
  order: 2
title: 外键
order: 21
---

# 外键

外键（Foreign Key）是数据库中用于建立和维护两个表之间关系的一种约束。它是一个表中的字段（或一组字段），这个字段是另一个表的主键的引用。通过外键约束，可以确保所谓的“参照完整性”，即只能在关联表中插入存在于被参照表的主键列中的值。

外键的主要目的是：

- **维护数据的一致性和完整性**：通过确保一个表中的数据引用另一个表中的有效数据，外键帮助维护数据库中数据之间的逻辑联系。
- **实现表之间的关系**：外键通过指向另一个表的主键，明确表明了两个表之间的关联关系，这对于实现一对一、一对多和多对多的关系至关重要。
- **支持级联操作**：外键约束允许定义级联更新和删除操作的行为。例如，当删除或更新一个表中的记录时，可以自动更新或删除另一个表中依赖的记录，从而保持数据的一致性。

外键约束确保了在添加或修改引用表的数据时，必须有一个相应的记录在被引用的表的主键字段中存在。这种机制防止了数据库中出现“悬挂的引用”，即引用了不存在的记录的情况。

## 特性

外键的特性主要体现在它们如何在数据库表之间建立关系，以及这些关系如何影响数据的完整性、一致性和操作。下面是外键的几个关键特性：

### 参照完整性

- 定义：确保一个表（子表或引用表）中的数据引用另一个表（父表或被引用表）中的有效数据。参照完整性是通过确保外键字段只包含在主键或唯一键字段中已存在的值来维护的。
- 作用：维护数据一致性，防止无效数据的出现。

### 级联操作

- 级联更新（CASCADE UPDATE）：当父表中的记录更新时，子表中所有匹配的外键字段也会自动更新。
- 级联删除（CASCADE DELETE）：当父表中的记录被删除时，子表中所有匹配的记录也会被自动删除。这有助于保持数据的一致性，但需要谨慎使用，以防不慎删除大量数据。
- 其他级联选项：如 SET NULL（父表记录删除时，子表对应字段设置为 NULL）和 NO ACTION 或 RESTRICT（防止违反外键约束的操作）。

### 复杂的表关系支持

- 多对一关系：一个外键列引用另一个表的主键，支持多对一的关系，例如，多个员工属于一个部门。
- 一对一关系：通过在外键上设置唯一约束，可以实现一对一的关系。
- 多对多关系：虽然外键直接支持的是一对多关系，但可以通过一个连接表（其中包含指向两个相关表的外键）来实现多对多关系。

### 数据验证

外键约束在插入或更新引用表的数据时自动验证数据的有效性，确保只能添加对存在于父表中的记录的有效引用。

### 自动和显式索引

- 自动索引：在某些数据库系统中，外键自动创建索引以提高关联操作的性能。在其他系统中，可能需要显式创建这些索引。
- 性能考虑：虽然外键提供了数据一致性的重要保证，但它们也可能影响插入、更新和删除操作的性能，因为数据库需要检查每个操作是否遵守外键约束。

### 设计和维护复杂性

外键增加了数据库设计的复杂性，尤其是在有很多表和复杂关系的大型数据库中。正确使用外键可以大幅度提升数据模型的强度和清晰度，但也需要更多的维护工作来保持结构的一致性。

外键的这些特性让它们成为维护关系数据库中表间完整性和实施业务逻辑规则的强大工具。正确理解和使用这些特性是高效和有效数据库设计的关键。

## 创建外键

创建外键主要有两种方式：一种是在创建新表时直接定义外键约束，另一种是在已存在的表上添加外键约束。下面通过代码示例详细说明这两种方法。

### 在表创建时定义外键

当你创建一个新表，并且已经知道这个表将会与另一个表通过外键关联时，可以在创建表的语句中直接定义外键约束。

假设我们有一个 `departments` 表，其结构如下：

```sql
CREATE TABLE departments (
    dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (dept_id)
);
```

接下来，我们创建一个 `employees` 表，其中的 `dept_id` 字段需要引用 `departments` 表中的 `dept_id` 字段，建立外键约束：

```sql
CREATE TABLE employees (
    emp_id INT NOT NULL AUTO_INCREMENT,
    emp_name VARCHAR(255) NOT NULL,
    dept_id INT,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
```

在这个例子中，`FOREIGN KEY (dept_id) REFERENCES departments(dept_id)` 定义了一个外键约束，指明 `employees` 表的 `dept_id` 字段引用 `departments` 表的 `dept_id` 字段。

### 在表创建后添加外键

如果表已经存在，但需要在之后添加外键约束，可以使用 `ALTER TABLE` 语句。

假设我们已经创建了 `employees` 表，但忘记添加 `dept_id` 字段的外键约束，可以通过以下语句添加：

```sql
ALTER TABLE employees
ADD CONSTRAINT fk_department
FOREIGN KEY (dept_id) REFERENCES departments(dept_id);
```

在这个例子中，`ADD CONSTRAINT fk_department FOREIGN KEY (dept_id) REFERENCES departments(dept_id)` 添加了一个名为 `fk_department` 的外键约束，指定 `employees` 表的 `dept_id` 字段引用 `departments` 表的 `dept_id` 字段。这里使用了 `ADD CONSTRAINT` 来明确给外键约束命名，这有助于在需要的时候更容易地识别和操作约束。

注意事项：

- 在添加外键约束之前，确保引用的字段（在本例中是 `departments.dept_id`）已经存在，并且是主键或具有唯一约束。
- 外键字段（`employees.dept_id`）和被引用的主键字段（`departments.dept_id`）必须具有相同的数据类型。
- 外键约束可以影响数据插入和删除的性能，因为数据库需要额外的操作来检查约束的有效性。
- 在某些情况下，如果外键约束导致循环依赖或复杂的级联操作，可能需要重新考虑数据库设计。

通过这些示例，你应该能够理解如何在MySQL中创建外键约束，无论是在创建表的时候还是在表已经存在之后。正确使用外键可以帮助你维护数据的完整性和一致性。

## 级连操作

级联操作允许在父表上执行更新（UPDATE）或删除（DELETE）操作时，自动在子表上执行相应的更新或删除操作，以保持数据库的引用完整性。这些操作主要包括级联更新（ON UPDATE CASCADE）、级联删除（ON DELETE CASCADE）以及设置为NULL（ON DELETE SET NULL、ON UPDATE SET NULL）。以下是使用这些级联操作的代码示例。

示例环境设置：

假设我们有两个表：`departments` 和 `employees`。`departments` 表有部门信息，而 `employees` 表存储员工信息，其中员工表通过外键 `dept_id` 与部门表相关联。

```sql
CREATE TABLE departments (
    dept_id INT NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE employees (
    emp_id INT NOT NULL AUTO_INCREMENT,
    emp_name VARCHAR(100) NOT NULL,
    dept_id INT,
    PRIMARY KEY (emp_id),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
```

### 级连更新

如果你希望在更新 `departments` 表中的 `dept_id` 时自动更新 `employees` 表中相应的 `dept_id`，可以在创建外键时使用 `ON UPDATE CASCADE` 选项。

```sql
ALTER TABLE employees DROP FOREIGN KEY employees_ibfk_1;

ALTER TABLE employees
ADD CONSTRAINT fk_dept_id
FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
ON UPDATE CASCADE;
```

这样，如果 `departments` 表中某个部门的 `dept_id` 发生变化，`employees` 表中所有对应的 `dept_id` 也会相应地自动更新。

### 级连删除

如果希望在删除 `departments` 表中的某个部门时，自动删除 `employees` 表中所有属于该部门的员工，可以在创建外键时使用 `ON DELETE CASCADE` 选项。

```sql
ALTER TABLE employees DROP FOREIGN KEY fk_dept_id;

ALTER TABLE employees
ADD CONSTRAINT fk_dept_id
FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
ON DELETE CASCADE;
```

使用这个选项后，删除 `departments` 表中的一个部门将会导致 `employees` 表中所有该部门的员工记录被自动删除。

### 设置为 NULL

如果在删除 `departments` 表中的某个部门时，你希望 `employees` 表中属于该部门的员工的 `dept_id` 字段被设置为 `NULL`，而不是删除这些员工记录，可以使用 `ON DELETE SET NULL`。

```sql
ALTER TABLE employees DROP FOREIGN KEY fk_dept_id;

ALTER TABLE employees
ADD CONSTRAINT fk_dept_id
FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
ON DELETE SET NULL;
```

这样，删除 `departments` 表中的一个部门时，`employees` 表中对应的 `dept_id` 将被设置为 `NULL`，而不是删除相关的员工记录。

注意事项：

- 在使用ON DELETE SET NULL或ON UPDATE SET NULL时，确保外键列允许NULL值。
- 使用级联操作时应谨慎，尤其是ON DELETE CASCADE，因为它可能会导致大量数据被自动删除，这可能不是你想要的结果。

通过这些示例，你可以看到如何在实际中使用和实现级联操作，以自动管理数据库中的关联数据更新和删除，从而维护数据的一致性和完整性。

