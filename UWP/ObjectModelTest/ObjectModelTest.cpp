// ObjectModelTest.cpp : Defines the entry point for the console application.
//

#include "stdafx.h"
#include "ParseUtil.h"
#include "AdaptiveCardParseException.h"
#include "AdaptiveCard.h"
#include "TextBlock.h"
#include <memory>
#include <iostream>
#include <string>
#include "ObjectModelTest.h"
#include "ParserTest.h"

using namespace std;
using namespace AdaptiveCards;

int main(int argc, const char* argv[])
{
    std::vector<ParserTest> tests =
    {
        ParserTest("TestJsonFiles\\imagetest.json", "ExpectedSerializedJson\\expected_imagetest.json"),
        ParserTest("TestJsonFiles\\textblock_noUnicode.json", "ExpectedSerializedJson\\expected_textblock_noUnicode.json"),
        ParserTest("TestJsonFiles\\nounicode.json", "ExpectedSerializedJson\\expected_nounicode.json"),
    };

    bool relpaceExpectedResultsWithActual = false;
    int testCount = 0;
    int passCount = 0;
    for (auto test : tests)
    {
        ++testCount;

        printf("Running test %i/%zu, (%s)", testCount, tests.size(), test.m_inputFile.c_str());
        try
        {
            auto deserializedCard = AdaptiveCard::DeserializeFromFile(test.m_inputFile);
            std::string actualResult = deserializedCard->SerializeToJsonString();

            // If there are major changes to the cards, we will want to replace all our expected results quickly.
            if (relpaceExpectedResultsWithActual && test.m_getExpectedResultsFromFile)
            {
                std::ofstream expectedFile(test.m_expectedResults);
                expectedFile << actualResult;
            }

            const std::string expectedResult = test.GetExpectedResults();
            if (expectedResult != actualResult)
            {
                printf(" | Failed\r\n Expected:\r\n%s\r\n\r\n", expectedResult.c_str());
            }
            else
            {
                ++passCount;
                printf(" | Passed \r\n\r\n");
            }
        }
        catch (const AdaptiveCards::AdaptiveCardParseException& e)
        {
            printf(" | Failed\r\n Expected:\r\n%s\r\n\r\n", test.GetExpectedResults().c_str());
            printf(e.what());
        }
        catch (...)
        {
            printf(" | Failed\r\n Expected:\r\n%s\r\n\r\n", test.GetExpectedResults().c_str());
        }
    }

    printf("Test Results: (%i/%zu) Passed", passCount, tests.size());

    return 0;
}
