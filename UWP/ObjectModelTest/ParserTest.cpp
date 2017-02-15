#include "ParserTest.h"
#include <fstream>
#include <iterator>

ParserTest::ParserTest(std::string inFile, std::string expect, bool getExpectedResultsFromFile) :
    m_inputFile(inFile),
    m_expectedResults(expect),
    m_getExpectedResultsFromFile(getExpectedResultsFromFile)
{}

std::string ParserTest::GetExpectedResults()
{
    if (!m_getExpectedResultsFromFile)
    {
        return m_expectedResults;
    }
    else
    {
        std::ifstream expectedResultsStream(m_expectedResults);
        std::string result(std::istreambuf_iterator<char>{expectedResultsStream}, {});
        return result;
    }

}

ParserTest::~ParserTest()
{
}
