#pragma once
#include <string>

class ParserTest
{
public:
    ParserTest(std::string inFile, std::string expect, bool getExpectedResultsFromFile = true);
    ~ParserTest();

    std::string GetExpectedResults();

    const std::string m_inputFile;
    const bool m_getExpectedResultsFromFile;
    const std::string m_expectedResults;
};
