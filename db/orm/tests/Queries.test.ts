import { Generated } from "../generated"

const orm = new Generated()

test('inserts data correctly', async() => {

    const data = await orm.user.insert( {
        data: {
            email: "email@email.com",
            name: "username"
        }
    } )

    expect( data ).toStrictEqual( [ { 
        email: "email@email.com",
        name: "username" 
    } ] )
})