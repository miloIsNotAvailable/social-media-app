import { User } from "../ast/types"
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

test('selects data correctly with inner join', async() => {

    const data = await orm.user.select( {
        data: { id: true, name: true },
        where: {
            id: "8a4b85a6-65d3-434653235-39636635-fb23d0c595f5"
        },
        include: {
            id: true,
            join: {
                posts: {
                    authorId: true
                }
            }
        },
    } )

    const expected = {"authorid": "8a4b85a6-65d3-434653235-39636635-fb23d0c595f5", "communityid": null, "content": null, "createdat": "2023-05-19T14:04:29.084Z", "id": "0", "name": "hey", "title": "ey", "updatedat": "2023-05-19T14:04:29.084Z" };

    expect( (data as User[])[0].id ).toHaveProperty( expected.id )
})

test('selects data correctly', async() => {

    const data = await orm.user.select( {
        data: { id: true, name: true },
        where: {
            id: "8a4b85a6-65d3-434653235-39636635-fb23d0c595f5"
        }
    } )

    expect( (data as User[])[0].id ).toStrictEqual( "8a4b85a6-65d3-434653235-39636635-fb23d0c595f5" )
})

test('deletes data correctly', async() => {

    const data = await orm.user.delete( {
        where: {
            email: "hello@gmail.com"
        },
        returning: { id: true }
    } )

    expect( data ).toStrictEqual( [ { 
        id: '8a4b85a6-65d3-434653235-39636635-fb23d0c595f5' 
    } ] )
})