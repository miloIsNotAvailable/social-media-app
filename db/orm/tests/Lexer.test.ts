import Lexer from "../Lexer"

const mockTables = `
model User {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    email     String   @unique
    name      String?
    posts     Post[]
}
  
model Post {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    published Boolean  @default(false)
    title     String   @db.VarChar(255)
    author    User?    @relation(fields: [authorId], references: [id])
    authorId  Int?
}`

const lexer = new Lexer( mockTables )

test('lexer splits tables correctly', async() => {

    const expected = [
        `model User {
            id        Int      @id @default(autoincrement())
            createdAt DateTime @default(now())
            email     String   @unique
            name      String?
            posts     Post[]
        }`,
        `model Post {
            id        Int      @id @default(autoincrement())
            createdAt DateTime @default(now())
            updatedAt DateTime @updatedAt
            published Boolean  @default(false)
            title     String   @db.VarChar(255)
            author    User?    @relation(fields: [authorId], references: [id])
            authorId  Int?
        }`
    ]

    expect( lexer.tables.map( e => e.replace(/\s/g, '') ) ).toStrictEqual( expected.map( e => e.replace(/\s/g, '') ) )
})

test('lexer gets table names correctly', async() => {

    const expected = [ "User", "Post" ]

    expect( lexer.tableNames.map( e => e.replace(/\s/g, '') ) ).toStrictEqual( expected.map( e => e.replace(/\s/g, '') ) )
})

test('lexer strips table to columns correctly', async() => {

    const supposed = lexer.tables.map( lexer.getTablesCols )
    const expected = [["  id        Int      @id @default(autoincrement())", "  createdAt DateTime @default(now())", "  email     String   @unique", "  name      String?", "  posts     Post[]"], ["  id        Int      @id @default(autoincrement())", "  createdAt DateTime @default(now())", "  updatedAt DateTime @updatedAt", "  published Boolean  @default(false)", "  title     String   @db.VarChar(255)", "  author    User?    @relation(fields: [authorId], references: [id])", "  authorId  Int?"]]

    const supposedStripped = supposed.map( e => 
        e.map( v => v.replace(/\s/g, '') ) 
    )

    const expectedStripped = expected.map( e => 
        e.map( v => v.replace(/\s/g, '') ) 
    )

    expect( supposedStripped ).toStrictEqual( expectedStripped )
})

test('lexer gets column names correctly', async() => {

    const supposed = lexer.tables.map( lexer.getTablesCols )
    const expected = [
        [
            "id",
            "createdAt",
            "email",
            "name",
            "posts",
        ], 
        [
            "id",
            "createdAt",
            "updatedAt",
            "published",
            "title",
            "author",
            "authorId",
        ]
    ]

    const supposedNames = supposed.map( e => 
        e.map( lexer.getColName )
    )

    expect( supposedNames ).toStrictEqual( expected )
})

test('lexer gets column types correctly', async() => {

    const supposed = lexer.tables.map( lexer.getTablesCols )
    const expected = [
        [
            "Int",
            "DateTime",
            "String",
            "String?",
            "Post[]",
        ], 
        [
            "Int",
            "DateTime",
            "DateTime",
            "Boolean",
            "String",
            "User?",
            "Int?",
        ]
    ]

    const supposedNames = supposed.map( e => 
        e.map(e => lexer.getColType( e )?.trim() )
    )

    expect( supposedNames ).toStrictEqual( expected )
})