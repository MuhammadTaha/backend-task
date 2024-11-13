import { Test, TestingModule } from "@nestjs/testing"
import { TagsService } from "../tags/tags.service"
import { CustomPrismaService, PrismaService } from "nestjs-prisma"
import { mockDeep } from "jest-mock-extended"
import { ExtendedPrismaClient } from "src/prisma/prisma.extension"

describe("Tagsservice", () => {
	let service: TagsService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TagsService, 
				{
					provide: "PrismaService",
					useValue: mockDeep<CustomPrismaService<ExtendedPrismaClient>>(),
				}
			],
		}).compile()

		service = module.get<TagsService>(TagsService)
	})

	it("should be defined", () => {
		expect(service).toBeDefined()
	})
})
