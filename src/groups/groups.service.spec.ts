import { Test, TestingModule } from "@nestjs/testing";
import { GroupsService } from "./groups.service";
import { ContactsService } from "src/contacts/contacts.service";
import { mockDeep } from "jest-mock-extended";
import { CustomPrismaService } from "nestjs-prisma";
import { ExtendedPrismaClient } from "src/prisma/prisma.extension";

describe("Groupsservice", () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: ContactsService,
          useValue: {
            findAll: jest
              .fn()
              .mockImplementation(async (_userId, _query) => []),
          },
        },
        {
          provide: "PrismaService",
          useValue: mockDeep<CustomPrismaService<ExtendedPrismaClient>>(),
        },
      ],
    })
      .compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
