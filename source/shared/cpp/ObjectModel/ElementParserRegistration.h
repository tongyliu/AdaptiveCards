#pragma once

#include "pch.h"
#include "BaseCardElement.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
    class ElementParserRegistration
    {
    public:

        static void AddParser(std::string elementType, std::shared_ptr<ICustomParser> parser);
        static void RemoveParser(std::string elementType);
        static std::shared_ptr<ICustomParser> GetParser(std::string elementType);

    private:
        static std::unordered_map<std::string, std::shared_ptr<ICustomParser>, CaseInsensitiveHash, CaseInsensitiveEqualTo> CardElementParsers;

        static bool ParsersInitialized;
        static void EnsureParsersInitialized();
    };
}