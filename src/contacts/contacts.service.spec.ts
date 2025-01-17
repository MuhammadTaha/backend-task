import { Test, TestingModule } from "@nestjs/testing"
import { Contact } from "@prisma/client"
import { CustomPrismaService, PrismaService } from "nestjs-prisma"
// import { ConversationsService } from "src/conversations/conversations.service"
import { ExtendedPrismaClient } from "src/prisma/prisma.extension"
// import { UsersService } from "src/users/users.service"
import { ContactsService } from "./contacts.service"
import { GroupsService } from "src/groups/groups.service"
import { mockDeep } from "jest-mock-extended"

const mockContact = (
	firstName = "Jane",
	lastName = "Doe",
	id = "123",
	email = "janedoe@test.com",
	fon = "+49 123 45678",
	countryCode = "de",
	createdAt = new Date(),
): Partial<Contact> => ({
	firstName,
	lastName,
	id,
	email,
	fon,
	countryCode,
	createdAt,
})

const contactArray = [
	mockContact(),
	mockContact("Jon Doe", "1234", "jondoe@test.com", "+49 123 456789"),
]

describe("Contactsservice", () => {
	let service: ContactsService
	let findManyMock: jest.Mock

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: ContactsService,
					useValue: {
					  findAll: jest
						.fn()
						.mockImplementation(async (_userId, _query) => contactArray),
					},
				  },
				{
					provide: CustomPrismaService<ExtendedPrismaClient>,
					useValue: {
						contacts: {
							findMany: findManyMock,
							
						},
					},
				},	


				{
					provide: GroupsService,
					useValue: {},
				},
				{
					provide: "PrismaService",
					useValue: mockDeep<CustomPrismaService<ExtendedPrismaClient>>(),
				},
			],
		}).compile()

		service = module.get<ContactsService>(ContactsService)
	})

	it("should be defined", () => {
		expect(service).toBeDefined()
	})

	afterEach(() => jest.clearAllMocks())

	it("should return all contacts", async () => {
		findManyMock = jest.fn().mockResolvedValue(contactArray)
		// FIXME:
		// @ts-ignore
		const contacts = await service.findAll("userId")

		expect(contacts).toEqual(contactArray)
	})
})
