#include "ElementParserRegistration.h"
#include "ChoiceSetInput.h"
#include "ColumnSet.h"
#include "Container.h"
#include "DateInput.h"
#include "FactSet.h"
#include "Image.h"
#include "ImageSet.h"
#include "NumberInput.h"
#include "TextBlock.h"
#include "TextInput.h"
#include "TimeInput.h"
#include "ToggleInput.h"

namespace AdaptiveCards
{
    bool ElementParserRegistration::ParsersInitialized = false;
    std::unordered_map<std::string, std::shared_ptr<ICustomParser>, CaseInsensitiveHash, CaseInsensitiveEqualTo> ElementParserRegistration::CardElementParsers = {};

    void ElementParserRegistration::EnsureParsersInitialized()
    {
        if (!ElementParserRegistration::ParsersInitialized)
        {
            std::shared_ptr<ContainerParser> containerParser = std::make_shared<ContainerParser>();
            std::shared_ptr<ColumnSetParser> columnSetParser = std::make_shared<ColumnSetParser>();
            std::shared_ptr<FactSetParser> factSetParser = std::make_shared<FactSetParser>();
            std::shared_ptr<ImageParser> imageParser = std::make_shared<ImageParser>();
            std::shared_ptr<ImageSetParser> imageSetParser = std::make_shared<ImageSetParser>();
            std::shared_ptr<TextBlockParser> textBlockParser = std::make_shared<TextBlockParser>();
            std::shared_ptr<ChoiceSetInputParser> choiceSetInputParser = std::make_shared<ChoiceSetInputParser>();
            std::shared_ptr<DateInputParser> dateInputParser = std::make_shared<DateInputParser>();
            std::shared_ptr<NumberInputParser> numberInputParser = std::make_shared<NumberInputParser>();
            std::shared_ptr<TextInputParser> textInputParser = std::make_shared<TextInputParser>();
            std::shared_ptr<TimeInputParser> timeInputParser = std::make_shared<TimeInputParser>();
            std::shared_ptr<ToggleInputParser> toggleInputParser = std::make_shared<ToggleInputParser>();

            ElementParserRegistration::CardElementParsers.insert({
                { CardElementTypeToString(CardElementType::Container), containerParser },
                { CardElementTypeToString(CardElementType::ColumnSet), columnSetParser },
                { CardElementTypeToString(CardElementType::FactSet), factSetParser },
                { CardElementTypeToString(CardElementType::Image), imageParser },
                { CardElementTypeToString(CardElementType::ImageSet), imageSetParser },
                { CardElementTypeToString(CardElementType::ChoiceSetInput), choiceSetInputParser },
                { CardElementTypeToString(CardElementType::DateInput), dateInputParser},
                { CardElementTypeToString(CardElementType::NumberInput), numberInputParser },
                { CardElementTypeToString(CardElementType::TextBlock), textBlockParser },
                { CardElementTypeToString(CardElementType::TextInput), textInputParser },
                { CardElementTypeToString(CardElementType::TimeInput), timeInputParser},
                { CardElementTypeToString(CardElementType::ToggleInput), toggleInputParser},
            });

            ElementParserRegistration::ParsersInitialized = true;
        }
    }

    void ElementParserRegistration::AddParser(std::string elementType, std::shared_ptr<ICustomParser> parser)
    {
        ElementParserRegistration::EnsureParsersInitialized();
        ElementParserRegistration::CardElementParsers[elementType] = parser;
    }

    void ElementParserRegistration::RemoveParser(std::string elementType)
    {
        ElementParserRegistration::EnsureParsersInitialized();
        ElementParserRegistration::CardElementParsers.erase(elementType);
    }

    std::shared_ptr<ICustomParser> ElementParserRegistration::GetParser(std::string elementType)
    {
        ElementParserRegistration::EnsureParsersInitialized();
        if (ElementParserRegistration::CardElementParsers.find(elementType) != ElementParserRegistration::CardElementParsers.end())
        {
            return CardElementParsers[elementType];
        }
        else
        {
            return std::shared_ptr<ICustomParser>(nullptr);
        }
    }
}
