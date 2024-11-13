import { Test, TestingModule } from "@nestjs/testing"
import { ContactsService } from "./contacts.service"
import { ContactsController } from "./contacts.controller"
import { TagsService } from "src/tags/tags.service"
import { Contact, User, User as UserModel, UserRole } from "@prisma/client"

describe("Contactscontroller", () => {
	let controller: ContactsController

	const mockContactsArray: Contact[] = [
		{
			id: "123",
			createdAt: new Date(),
			updatedAt: new Date(),
			firstName: "Jane",
			lastName: "Doe",
			email: "",
			fon: "",
			active: false,
			shopifyID: null,
			shopifyPurchaseCount: 3,
			countryCode: "de",
			notes: "",
			byUserID: "123",
			birthday: null,
		}
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ContactsController],
			providers: [
				{
					provide: ContactsService,
					useValue: {
						findAll: jest
							.fn()
							.mockImplementation()
							.mockReturnValue([]),
					},
				},
				{
					provide: TagsService,
					useValue: {},
				}
			],
		}).compile()

		controller = module.get<ContactsController>(ContactsController)
	})

	it("should be defined", () => {
		expect(controller).toBeDefined()
	})

	describe("findAllContacts", () => {

		const mockUser: User = {
			id: "123",
			createdAt: new Date(),
			updatedAt: new Date(),
			email: "janedoe@test.com",
			firstName: "Jane",
			lastName: "Doe",
			code: "de",
			companyName: null,  
			companyAvatarUrl: null,  
			hash: null,  
			fon: "+49 123 45678",
			role: UserRole.Admin,
			resetToken: null,  
			activationToken: null,  
			archived: null,  
			adminID: null,  
		  };

		it("should return an array of contacts", async () => {
			await expect(controller.findAllContacts({}, mockUser)).resolves.toEqual(
				// [] 
				{"cursorID": null, "data": []}
			)
		})
	})
})
