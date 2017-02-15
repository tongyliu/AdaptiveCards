#pragma once
#include <string>

class ParserTest
{
public:
    ParserTest(std::string inFile, std::string expect, bool getExpectedResultsFromFile = true);
    ~ParserTest();

    std::string GetExpectedResults();

    const std::string m_inputFile;

private:
    const std::string m_expectedResults;
    const bool m_getExpectedResultsFromFile;
};
