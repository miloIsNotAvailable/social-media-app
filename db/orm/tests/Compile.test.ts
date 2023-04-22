import { Compile } from "../Compile"
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

// const lexer = new Lexer( mockTables )
const compiler = new Compile( mockTables )

test('compiler compiles attributes correctly', async() => {

    const expected = [
        []
    ]

    // const supposed = compiler.tables.map( compiler.getTablesCols )
    // const supposedAttrs = supposed.map(
    //     // compiler.compileColAttrs
    // )

    // expect( compiler.tables.map( e => e.replace(/\s/g, '') ) ).toStrictEqual( expected.map( e => e.replace(/\s/g, '') ) )
})